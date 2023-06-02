// import { useState, useEffect } from "react";
// import { collection ,getDocs } from "firebase/firestore";
// const [data, setData] = useState({});
// useEffect(() => {
//   const getCategories = async () => {
//     let list = [];
//     try {
//       // const q = query(
//       //   collection(db, "Categorie"),
//       //   where(
//       //     "cat_admin_id",
//       //     "==",
//       //     JSON.parse(localStorage.getItem("user"))["uid"]
//       //   )
//       // );
//       const querySnapshot = await getDocs(collection(db, "Categorie"));
//       querySnapshot.forEach((doc) => {
//         list.push({ id: doc.id, ...doc.data() });
//         console.log(data);
//       });
//       setData(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getCategories();
// }, []);

// export const categ = [
//   Object.keys(data).map((id, index) => {
//     return {
//       nom: data[index].id,
//       qunatite: data[index].Cat_quantite,
//     };
//   }),
// ];
