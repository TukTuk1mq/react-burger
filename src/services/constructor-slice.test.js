import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from "./constructor-slice";

const baseIng = {
  _id: "id",
  name: "Name",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 1,
  image: "",
  image_mobile: "",
  image_large: "",
  __v: 0,
};

describe("constructor-slice", () => {
  const initial = { bun: null, ingredients: [] };

  it("initial", () => {
    expect(reducer(undefined, { type: "X" })).toEqual(initial);
  });

  it("adds bun", () => {
    const bun = { ...baseIng, type: "bun" };
    const s = reducer(initial, addIngredient(bun));
    expect(s.bun?._id).toBe("id");
  });

  it("adds ingredient with uuid", () => {
    const ing = { ...baseIng, _id: "ing1", type: "main" };
    const s = reducer(initial, addIngredient(ing));
    expect(s.ingredients).toHaveLength(1);
    expect(s.ingredients[0]).toHaveProperty("uuid");
  });

  it("moves ingredient", () => {
    const s1 = reducer(
      initial,
      addIngredient({ ...baseIng, _id: "a", type: "main" })
    );
    const s2 = reducer(
      s1,
      addIngredient({ ...baseIng, _id: "b", type: "main" })
    );
    const idA = s2.ingredients[0].uuid;
    const idB = s2.ingredients[1].uuid;
    const s3 = reducer(s2, moveIngredient({ dragIndex: 0, hoverIndex: 1 }));
    expect(s3.ingredients[0].uuid).toBe(idB);
    expect(s3.ingredients[1].uuid).toBe(idA);
  });

  it("removes by uuid", () => {
    const s1 = reducer(
      initial,
      addIngredient({ ...baseIng, _id: "a", type: "main" })
    );
    const uuid = s1.ingredients[0].uuid;
    const s2 = reducer(s1, removeIngredient(uuid));
    expect(s2.ingredients).toHaveLength(0);
  });

  it("clears constructor", () => {
    const s = reducer(
      {
        bun: { ...baseIng, type: "bun", uuid: "x" },
        ingredients: [{ ...baseIng, type: "main", uuid: "y" }],
      },
      clearConstructor()
    );
    expect(s).toEqual(initial);
  });
});
