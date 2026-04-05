import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Notiflix from "notiflix";
import { blogs } from "../../assets/Assets";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentPage, selectedCategory]);
  const filteredBlogs =
    selectedCategory === "All" ? blogs : blogs.filter((blog) => blog.category === selectedCategory);

  const blogsPerPage = 8;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    Notiflix.Notify.success(`Page ${pageNumber} loaded successfully!`);
  };

  return (
    <>
      <div className="admin-main">
        <div className="blog-container">
          <div className="page-title flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Blog List</h2>
              <span>
                Showing <span className="font-semibold">{loading ? "..." : currentBlogs.length}</span> of{" "}
                <span className="font-semibold">{loading ? "..." : blogs.length}</span>
              </span>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate("/admin/blog/new")}
              >
                New Blog
              </button>
            </div>
          </div>
          <div className="contents">
            <div className="blog-lists grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading
                ? Array.from({ length: blogsPerPage }).map((_, index) => (
                    <div className="blog skeleton bg-gray-200 p-4 rounded" key={index}>
                      <Skeleton height={150} />
                      <Skeleton width={"80%"} />
                      <Skeleton count={2} />
                    </div>
                  ))
                : currentBlogs.map((blog, index) => (
                    <Link
                      to={`/article/${blog.id}`}
                      className="blog bg-white shadow-md rounded p-4 hover:shadow-lg"
                      key={index}
                    >
                      <div className="img">
                        <img src={blog.thumbnail} alt={blog.title} className="rounded" />
                      </div>
                      <div className="detail">
                        <h3 title={blog.title} className="truncate-2-lines font-bold">
                          {blog.title}
                        </h3>
                        <p className="truncate-2-lines text-gray-600">{blog.teaser}</p>
                      </div>
                    </Link>
                  ))}
            </div>
            <div className="blog-pagination flex justify-center items-center mt-4 space-x-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <MdOutlineKeyboardArrowLeft />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <MdOutlineKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;