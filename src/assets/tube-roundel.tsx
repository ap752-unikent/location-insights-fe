import * as React from "react"

function TubeRoundel(props: any) {
  return (
    <svg
      height="18"
      viewBox="0 0 64 64"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="32" cy="32" fill="#fff" r="17" />
      <path d="M3 27h58v10H3z" fill="#233b8e" />
      <g fill="#da1c4b">
        <path d="M46.128 37a14.98 14.98 0 01-28.256 0H10a22.444 22.444 0 0044 0zM17.872 27a14.98 14.98 0 0128.256 0H54a22.444 22.444 0 00-44 0z" />
      </g>
    </svg>
  )
}

export default TubeRoundel
