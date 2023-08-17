import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowDownWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterAllPosts,
  GetAllCategories,
} from "../../store/actions/PostActions";
import "../../assets/css/post.css";
import { useLocation, useNavigate } from "react-router-dom";

const filterSelect = [
  {
    id: 1,
    field: "Time",
    filter: "updatedAt",
  },
  {
    id: 2,
    field: "Title",
    filter: "title",
  },
];
const filterSortName = [
  {
    id: 1,
    name: "asc",
    icon: faArrowDownShortWide,
  },
  {
    id: 2,
    name: "desc",
    icon: faArrowDownWideShort,
  },
];

function FilterPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector((state) => state.posts.categories);
  const categoryId = useSelector((state) => state.posts.sort.categoryId);
  const column = useSelector((state) => state.posts.sort.column);
  const sortType = useSelector((state) => state.posts.sort.sortType);
  const search = useSelector((state) => state.posts.sort.search);
  const page = useSelector((state) => state.posts.sort.page);
  const userId = useSelector((state) => state.auth.user.id);
  const [sort, setSort] = useState({
    categoryId: categoryId,
    column: column,
    sortType: sortType,
    search: search,
  });

  useEffect(() => {
    console.log("calllllll filter");
    const urlParts = location.pathname.split("/");
    const isMe = urlParts[urlParts.length - 1] === "me" ? true : false;
    dispatch(
      FilterAllPosts(
        sort.categoryId || 1,
        sort.page || 1,
        sort.column || "updatedAt",
        sort.sortType || "desc",
        sort.search || "",
        userId || 0,
        isMe
      )
    );
  }, [sort]);

  useEffect(() => {
    dispatch(GetAllCategories());
  }, []);

  const setField = (field, value) => {
    setSort({
      ...sort,
      [field]: value,
    });
  };

  return (
    <>
      <div className="post-filter">
        <div className="d-flex mb-2">
          <div className="d-flex">
            <div className="me-2">
              {/* select */}
              <Form.Select
                value={sort.categoryId}
                onChange={(e) => setField("categoryId", e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="me-2">
              {/* select */}
              <Form.Select
                value={sort.column}
                onChange={(e) => setField("column", e.target.value)}
              >
                {filterSelect.map((item) => (
                  <option key={item.id} value={item.filter}>
                    {item.field}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="ms-2 d-flex align-items-center">
            <div className="d-flex">
              {/* sort */}
              {filterSortName.map((item) => (
                <div key={item.id} className="d-flex">
                  <div className="d-flex align-items-center me-2">
                    <Form.Check
                      className="me-2"
                      value={item.name}
                      name="sortNotes"
                      label={item.name}
                      type="radio"
                      onChange={(e) => setField("sortType", e.target.value)}
                      checked={sort.sortType === item.name}
                    />
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Form
          className="d-flex mb-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.seachToken.value);
            setField("search", e.target.seachToken.value);
          }}
        >
          <div className="input-group">
            <Form.Control
              name="seachToken"
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="form-control"
              // onChange={props.handleSearchChange}
            />
            <Button type="submit" variant="outline-secondary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

FilterPosts.propTypes = {};

export default FilterPosts;
