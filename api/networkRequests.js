import axios from "axios";
import { FIREBASE_API_KEY, FIREBASE_API_URL } from "@env";

export const authenticate = async (mode, formValues) => {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;
    const response = await axios.post(url, {
      email: formValues.email,
      password: formValues.password,
      returnSecureToken: true,
    });
    const token = response?.data?.idToken;
    const userId = response?.data?.localId;
    if (token && userId) {
      if (mode === "signUp") {
        delete formValues.password;
        await axios.put(`${FIREBASE_API_URL}/users/${userId}.json`, formValues);
      }
      return { userId, token };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (userId) => {
  const response = await axios.get(`${FIREBASE_API_URL}/users/${userId}.json`);
  const data = response.data;
  return data;
};

export const getAllProducts = async () => {
  const response = await axios.get(`${FIREBASE_API_URL}/products.json`);
  const data = response.data;

  const transformedData = [];
  for (const key in data) {
    const obj = { id: key, ...data[key] };
    transformedData.push(obj);
  }

  return transformedData;
};

export const getProductDetails = async (productId) => {
  const [productInfo, productReviews] = await Promise.all([
    axios.get(`${FIREBASE_API_URL}/products/${productId}.json`),
    axios.get(`${FIREBASE_API_URL}/comments/${productId}.json`),
  ]);

  const transformedReviews = [];
  for (const key in productReviews.data) {
    const obj = { id: key, ...productReviews.data[key] };
    transformedReviews.push(obj);
  }

  return { productInfo: productInfo.data, productReviews: transformedReviews };
};

export const sendReviewAndUpdateRating = async (data) => {
  await Promise.all([
    axios.post(
      `${FIREBASE_API_URL}/comments/${data.productId}.json`,
      data.reviewData
    ),
    axios.put(
      `${FIREBASE_API_URL}/products/${data.productId}/rating.json`,
      data.rating
    ),
  ]);
  return null;
};
