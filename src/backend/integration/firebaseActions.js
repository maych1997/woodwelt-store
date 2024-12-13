import { get, ref as dbRef } from "firebase/database";
import { database } from "../connection";
import { useDispatch } from "react-redux";
import { setProductCategories } from "../../redux/orebiSlice";

const fetchCategories = async (dispatch) => {
  try {
      const categoryRef = dbRef(database, "category/");
      const snapshot = await get(categoryRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const categoryArray = Object.keys(data).map((key, index) => ({
          id: index,
          ...data[key],
        }));
        dispatch(setProductCategories(categoryArray));
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
export {fetchCategories}
