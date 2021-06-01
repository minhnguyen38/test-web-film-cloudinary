import Body from '../components/Body'
import Header from '../components/Header'
import { GetServerSideProps, NextPage } from 'next'
import { HomeProps } from "../interfaces/HomeProps";

export const API_KEY: string = "448766925518983"
export const API_SECRET: string = "Hv8L6uElQPplmCnCPUZVuzt_lu4"
export const CLOUD_NAME: string = "minhnguyen38"

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/video`)
  const data = await res.json()
  return {
      props: { data },
  }
}
const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Header />
 
      <Body data={props.data.resources} />
    </>  
  )
}

export default Home