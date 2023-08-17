import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../../utils/scrollToTop";
import { FilterAllPosts } from "../../store/actions/PostActions";
import { useLocation } from "react-router-dom";

function CustomPagination() {
  const dispatch = useDispatch();
  const location = useLocation();
  const totalPages = useSelector((state) => state.posts.pagination.totalPages);
  const currentPage = useSelector(
    (state) => state.posts.pagination.currentPage
  );
  const categoryId = useSelector((state) => state.posts.sort.categoryId);
  const column = useSelector((state) => state.posts.sort.column);
  const sortType = useSelector((state) => state.posts.sort.sortType);
  const search = useSelector((state) => state.posts.sort.search);
  const userId = useSelector((state) => state.auth.user.id);

  const onPageChange = (pageNumber) => {
    console.log(pageNumber);
    const urlParts = location.pathname.split("/");
    const isMe = urlParts[urlParts.length - 1] === "me" ? true : false;
    dispatch(
      FilterAllPosts(
        categoryId || 1,
        pageNumber || 1,
        column || "updatedAt",
        sortType || "desc",
        search || "",
        userId || 0,
        isMe
      )
    );
    scrollToTop();
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <Pagination>
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      />

      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default CustomPagination;
