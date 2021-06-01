import Header from '../../components/Header';
import { useRouter } from 'next/router'
import pageStyles from '../../styles/Page.module.css'
import { Row, Col } from 'antd'
import Link from 'next/link'
// @ts-ignore
import { Video } from 'cloudinary-react';
import { API_KEY, API_SECRET, CLOUD_NAME } from '../index';
import { GetServerSideProps, NextPage } from 'next'
import React, { FC } from 'react';
import { APIData, MovieId, MovieItemProps } from '../../interfaces/BodyProps';
import { HomeProps } from '../../interfaces/HomeProps';


export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/video`)
    const data = await res.json()
    return {
        props: { data },
    }
  }

const ReferenceMovieItem: FC<MovieItemProps> = ({ url, title }) => {
    const formatTitle = title.split("-").join(" ")
    return (
        <Link href={url}>
            <a className={pageStyles.othersMoviesTitle}>{formatTitle}</a>
        </Link>
    )
}

const defaultMoviveMetaData = {
    public_id: ""
}

const MoviePage: NextPage<HomeProps> = (props) => {
    const resources = props.data.resources
    const router = useRouter();
    const [movieId, setMovieId] = React.useState<MovieId>(null);
    const [movieMetaData, setMovieMetaData] = React.useState<APIData>(defaultMoviveMetaData);

    React.useEffect(() => {
        const matchedMovieId = router.query.movieId;
        if (matchedMovieId) {
            setMovieId(matchedMovieId);
            setMovieMetaData(
                resources.find(movie => movie.public_id) || defaultMoviveMetaData
            )
        }
    }, [router.query.movieId])
    const filmTitle = movieMetaData.public_id.split("-").join(" ");

    return (
        <>
            <Header />
            <Row justify="center" style={{ marginTop: "50px" }}>
                <Col span={19}>
                    <h5 className={pageStyles.movieTitle}>
                        Xem phim {filmTitle || ""}
                    </h5>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={14}>
                    {movieId &&
                        <Video
                            style={{ width: "90%" }}
                            cloudName={CLOUD_NAME}
                            publicId={movieId}
                            controls={true} />
                    }
                </Col>
                <Col span={5} style={{ paddingLeft: "25px" }}>
                    <h3 className={pageStyles.othersMovies}>Phim Khác</h3>
                    {
                        movieId &&
                        resources
                            .filter(movie => movie.public_id !== movieId)
                            .map((movie, idx) => <ReferenceMovieItem
                                key={`ref-movie-${idx}`}
                                title={movie.public_id}
                                url={movie.public_id}
                            />)
                    }
                </Col>
            </Row>
        </>
    )
}

export default MoviePage