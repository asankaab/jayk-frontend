export default function loading() {

    const styles = {
      border: "10px solid #f3f3f3", 
      borderTop: "10px solid #3498db",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite",
      margin: "auto",
    }

return (
    <div className="flex justify-center items-center min-h-[85vh]">
        <div style={styles}></div>
    </div>
)
}