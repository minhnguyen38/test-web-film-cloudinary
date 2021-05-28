import pageStyles from '../styles/Page.module.css'
import { Col, Row } from 'antd'
import Link from 'next/link'
import Image from 'next/image'


export const fakeMovies = [
    { url: "/movies/Dune-Official", title: "Dune",  image: "/images/snake-eyes.jpg"},
    { url: "/movies/the-midnight-sky_zelnkw", title: "The Midnight Sky", image: "/images/falcon.jpg"},
    { url: "/movies/greenland_kovcbp", title: "Greenland", image: "/images/wandavision-poster.jpg"},
    { url: "/movies/truenorth-ad-reel_n7spqf", title: "Truenorth Ad Reel", image: "/images/snake-eyes.jpg" },
]

const MovieItem = ({url, title, image}) => {
    return (
        <div className={pageStyles.movieBlock}>
            <Link href={url}>
                <div>
                    <Image
                        src={image}
                        alt="film"
                        width={120}
                        height={150}
                        layout="responsive"
                    />
                    <div className={pageStyles.filmDescription}>{title}</div>
                </div>
            </Link>
        </div>
    )
}

const Body = (props) => {
    console.log(props)
    return (
        <Row justify="center" style={{ padding: "50px 0", color: "#fff" }}>
            <Col span={14}>
                <Row justify="space-between">
                    {fakeMovies.map((movie, idx) => 
                        <Col key={`movie-${idx}`} span={5}>
                            <MovieItem 
                                url={movie.url}
                                title={movie.title}
                                image={movie.image}
                            />
                        </Col>)}
                </Row>
            </Col>
            <Col span={5} style={{paddingLeft: "25px"}}>
                <h3 className={pageStyles.othersMovies}>Phim HOT</h3>
                <div>Đang cập nhật</div>
            </Col>
        </Row>
    )
}

export async function getStaticProps() {
    return {
        props: {
            fakeMovies
        }
    }
}

export default Body
