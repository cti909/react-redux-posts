import {
  addPosts,
  deletePosts,
  editPosts,
  filterAllPosts,
  getAllCategories,
  getAllMyPosts,
  getAllPosts,
  getDetailPost,
} from "../../services/Posts/Posts.service";
import {
  ADD_POST,
  ADD_POST_FAILED,
  ADD_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAILED,
  DELETE_POST_SUCCESS,
  GET_ALL_CATEGORIES,
  GET_ALL_MY_POST,
  GET_ALL_POST,
  GET_DETAIL_POST,
  UPDATE_POST,
  UPDATE_POST_FAILED,
  UPDATE_POST_SUCCESS,
} from "../../constants/ActionConstant";

console.log("action posts");

export const GetAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await getAllCategories();
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: [],
      });
    }
  };
};
/**
 * Lay POSTs trong 1 trang cua minh
 */
export const GetAllMyPosts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await getAllMyPosts(userId);
      dispatch({
        type: GET_ALL_MY_POST,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ALL_MY_POST,
        payload: [],
      });
    }
  };
};
/**
 * Lay POSTs trong 1 trang
 */
export const GetAllPosts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await getAllPosts(userId);
      dispatch({
        type: GET_ALL_POST,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ALL_POST,
        payload: [],
      });
    }
  };
};

export const FilterAllPosts = (
  categoryId,
  page,
  column,
  sortType,
  search,
  userId
) => {
  return async (dispatch) => {
    try {
      const response = await filterAllPosts(
        categoryId,
        page,
        column,
        sortType,
        search,
        userId
      );
      dispatch({
        type: GET_ALL_POST,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ALL_POST,
        payload: [],
      });
    }
  };
};

export const GetDetailPost = (post_id, userId) => {
  return async (dispatch) => {
    try {
      const response = await getDetailPost(post_id, userId);
      dispatch({
        type: GET_DETAIL_POST,
        payload: { data: response.data, meta: response.meta },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_DETAIL_POST,
        payload: [],
      });
    }
  };
};

// action dispatch di dau ???
export const AddPosts = (title, content, category_id, userId) => {
  return async (dispatch) => {
    try {
      const response = await addPosts(title, content, category_id, userId);
      dispatch({
        type: ADD_POST,
        payload: { data: response.data, meta: response.meta },
      });
      return ADD_POST_SUCCESS;
    } catch (err) {
      console.log(err);
      dispatch({
        type: ADD_POST,
        payload: [],
      });
      return ADD_POST_FAILED;
    }
  };
};

export const EditPosts = (title, content, categoryId, postId, userId) => {
  return async (dispatch) => {
    try {
      const response = await editPosts(
        title,
        content,
        categoryId,
        postId,
        userId
      );
      dispatch({
        type: UPDATE_POST,
        payload: { data: response.data, meta: response.meta },
      });
      return UPDATE_POST_SUCCESS;
    } catch (err) {
      console.log(err);
      dispatch({
        type: UPDATE_POST,
        payload: [],
      });
      return UPDATE_POST_FAILED;
    }
  };
};

export const DeletePosts = (post_id, sortType, column, search, userId) => {
  return async (dispatch) => {
    try {
      const response = await deletePosts(
        post_id,
        sortType,
        column,
        search,
        userId
      );
      dispatch({
        type: DELETE_POST,
        payload: { data: response.data, meta: response.meta },
      });
      return DELETE_POST_SUCCESS;
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_POST,
        payload: [],
      });
      return DELETE_POST_FAILED;
    }
  };
};
