// import fetch from 'isomorphic-unfetch'

function index({ stars }) {
  return <div>
    Next stars: {stars}
    <div>123</div>
  </div>
}

index.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default index
