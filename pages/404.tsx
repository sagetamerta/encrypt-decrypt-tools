import Link from 'next/link'

const Error = () => (
  <div className="bg-gray-100 w-full h-dvh flex items-center justify-center">
    <div className="flex flex-col items-center justify-center text-center max-w-5xl">
      <h1 className="text-center mb-4 text-4xl">Opps!!!</h1>
      <h4 className="text-center mb-4">
        This page you are looking for could not be found.
      </h4>
      <Link href="/">
        <p className="text-blue-500 font-semibold">Go back to home</p>
      </Link>
    </div>
  </div>
)

Error.layout = 'Blank'
export default Error
