import Header from '../../components/Header';
import { useRouter } from 'next/router'
import pageStyles from '../../styles/Page.module.css'
import { Row, Col } from 'antd'
import React from 'react'
import { Video } from 'cloudinary-react';
import { fakeMovies } from "../../components/Body";

const ReferenceMovieItem = ({ url, title, image }) => {
    const onClickUrl = () => {
        window.location.href = url
    }
    return (
        <div onClick={onClickUrl} className={pageStyles.othersMoviesDetail}>
            <img src={image} alt="" className={pageStyles.othersMoviesImg} />
            <span className={pageStyles.othersMoviesTitle}>{title}</span>
        </div>
    )
}

const MoviePage = (props) => {
    const router = useRouter();
    const [movieId, setMovieId] = React.useState(null);
    const [movieMetaData, setMovieMetaData] = React.useState({});

    React.useEffect(() => {
        const matchedMovieId = router.query.movieId;
        if (matchedMovieId) {
            setMovieId(matchedMovieId);
            setMovieMetaData(
                props.data.find(movie => movie.url.split("/").pop() === matchedMovieId)
            )
        }
    }, [router.query.movieId])

    return (
        <>
            <Header />
            <Row justify="center" style={{ marginTop: "50px" }}>
                <Col span={19}>
                    <h5 className={pageStyles.movieTitle}>
                        Xem phim {movieMetaData.title || ""}
                    </h5>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={14}>
                    {movieId &&
                        <Video
                            style={{ width: "90%" }}
                            cloudName="minhnguyen38"
                            publicId={movieId}
                            controls={true} />
                    }
                </Col>
                <Col span={5} style={{ paddingLeft: "25px" }}>
                    <h3 className={pageStyles.othersMovies}>Phim Khác</h3>
                    {
                        movieId &&
                        props?.data
                            .filter(movie => movie.url.split("/").pop() !== movieId)
                            .map((movie, idx) => <ReferenceMovieItem
                                key={`ref-movie-${idx}`}
                                title={movie.title}
                                url={movie.url}
                                image={movie.image}
                            />)
                    }
                </Col>
            </Row>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            data: fakeMovies
        }
    }
}

export default MoviePage