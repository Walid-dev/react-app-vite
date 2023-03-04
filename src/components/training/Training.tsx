export const Training = () => {
  const arr1: Array<string> = ["aaa", "bbb", "ccc", "aaa"];
  const arr2: Array<string> = ["aaa", "ddd", "eee", "aaa"];

  const newArr = (arr1, arr2) => {
    const filteredArr1 = new Set(arr1);
    const filteredArr2 = new Set(arr2);

    return (finalArr = [...filteredArr1].filter((element) => !filteredArr2.has(element)));
  };

  console.log(newArr);

  return (
    <div>
      <h3>Training</h3>
    </div>
  );
};
