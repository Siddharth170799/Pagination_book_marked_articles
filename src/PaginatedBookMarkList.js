import "./App.css";
import Bar from "./Bar";
import { useEffect, useMemo, useState } from "react";
import { generateDummyArticles } from "./utils";

function PaginatedBookMarkList() {
  const [data, setData] = useState(generateDummyArticles());
  const [toggle, setToggle] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [bookmarkedData, setBookmarkedData] = useState([]);

  const ITEMS_PER_PAGE = 4;

  const pages = useMemo(() => {
    return Math.ceil(
      bookmarkedData.length > 0
        ? bookmarkedData.length / ITEMS_PER_PAGE
        : data.length / ITEMS_PER_PAGE
    );
  }, [bookmarkedData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleElementsDisplay = () => {
    const filtered =
      bookmarkedData.length > 0
        ? bookmarkedData.slice(
            pageNo * ITEMS_PER_PAGE,
            (pageNo + 1) * ITEMS_PER_PAGE
          )
        : data.slice(pageNo * ITEMS_PER_PAGE, (pageNo + 1) * ITEMS_PER_PAGE);
    setFilteredData(filtered);
  };

  const handleBookMark = (id1) => {
    const checkedData = data.map((item) => {
      return item.id === id1 ? { ...item, checked: !item.checked } : item;
    });
    setData(checkedData);
  };

  const showBookMarkedData = () => {
    const bookedData = data.filter((item) => item.checked);
    setFilteredData(bookedData);
    setBookmarkedData(bookedData);
  };

  useEffect(() => {
    handleElementsDisplay();
  }, [pageNo, data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPageNo(0);
    handleElementsDisplay();
  }, [pages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (toggle) {
      showBookMarkedData();
    } else {
      setPageNo(0);
      setFilteredData(data);
      setBookmarkedData([]);
      handleElementsDisplay();
    }
  }, [toggle]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        height: "100vh",
        padding: "20px",
        backgroundImage:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          maxWidth: "800px",
          margin: "auto",
          height: "calc(100vh - 80px)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#333",
            fontSize: "2rem",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Articles
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            backgroundColor: "#f8f9fa",
            padding: "12px",
            borderRadius: "10px",
            border: "2px solid #e9ecef",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              color: "#495057",
            }}
          >
            <input
              data-testid="bookmark-filter-checkbox"
              type="checkbox"
              checked={toggle}
              onChange={() => {
                setToggle(!toggle);
              }}
              style={{
                marginRight: "10px",
                transform: "scale(1.2)",
              }}
            />
            Show only bookmarked
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {bookmarkedData.length > 0 ? (
            filteredData.length > 0 ? (
              filteredData.map((item1) => (
                <Bar
                  onClick={handleBookMark}
                  item={item1}
                  key={item1.id || 1}
                />
              ))
            ) : (
              <h3
                data-testid="no-articles-message"
                style={{
                  color: "#66757d",
                  fontSize: "1.2rem",
                  marginTop: "40px",
                }}
              >
                No Articles to display.
              </h3>
            )
          ) : filteredData.length > 0 ? (
            filteredData.map((item1) => (
              <Bar
                onClick={handleBookMark}
                item={item1}
                key={item1.id || 1}
              />
            ))
          ) : (
            <h3
              data-testid="no-articles-message"
              style={{
                color: "#66757d",
                fontSize: "1.2rem",
                marginTop: "40px",
              }}
            >
              No Articles to display.
            </h3>
          )}
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            disabled={pageNo === 0}
            onClick={() => setPageNo(pageNo - 1)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: pageNo === 0 ? "#e9ecef" : "#007bff",
              color: pageNo === 0 ? "#6c757d" : "white",
              cursor: pageNo === 0 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            Prev
          </button>

          <p
            style={{
              margin: "0",
              fontSize: "1.1rem",
              color: "#495057",
            }}
          >
            <span
              data-testid="page-indicator"
              className="active"
              style={{
                fontWeight: "bold",
                color: "#007bff",
              }}
            >
              {filteredData.length > 0 ? pageNo + 1 : 1}
            </span>{" "}
            of {filteredData.length > 0 ? pages : 1}
          </p>

          <button
            data-testid="next-button"
            disabled={pageNo + 1 === pages || filteredData.length <= 0}
            onClick={() => setPageNo(pageNo + 1)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor:
                pageNo + 1 === pages || filteredData.length <= 0
                  ? "#e9ecef"
                  : "#007bff",
              color:
                pageNo + 1 === pages || filteredData.length <= 0
                  ? "#6c757d"
                  : "white",
              cursor:
                pageNo + 1 === pages || filteredData.length <= 0
                  ? "not-allowed"
                  : "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginatedBookMarkList;