const Bar = ({ item, onClick = () => { } }) => {
    return (
        <>
            <div
                style={{
                    border: "1px solid black",
                    minHeight: "140px",
                    width: "400px",
                    // padding: "10px",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}

            >
                <div
                    style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
                >
                    <h2>{item.heading}</h2>
                    <span
                        onClick={() => onClick(item.id)}

                        style={{ cursor: "pointer", fontSize: "20px" }}
                    >
                        {item.checked ? "★" : "☆"} Bookmark
                    </span>
                </div>
                <p>{item.content}</p>
            </div >
        </>
    );
};

export default Bar;