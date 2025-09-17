const Xbutton = ({ color = "#B1B8B9", fillC = "none" }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4L4 20M20 20L4 4"
          stroke={color}
          fill={fillC}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };
  
  export default Xbutton;