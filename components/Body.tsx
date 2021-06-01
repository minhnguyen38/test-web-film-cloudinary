import pageStyles from '../styles/Page.module.css'
import { Col, Row } from 'antd'
import Link from 'next/link'
import { BodyProps, MovieItemProps } from '../interfaces/BodyProps'
import {FC} from 'react'

const MovieItem: FC<MovieItemProps> = ({ url, title }) => {
    const pathURL = `/movies/${url}`
    const formatTitle = title.split("-").join(" ")
    return (
        <div className={pageStyles.movieBlock}>
            <Link href= {pathURL}>
                <a className={pageStyles.filmDescription}>{formatTitle}</a>
            </Link>
        </div>
    )
}

const Body: FC<BodyProps> = (props) => {
    return (
        <Row justify="center" style={{ padding: "50px 0", color: "#fff" }}>
            <Col span={14}>
                <Row justify="space-between">
                    {props.data.map((movie, idx) =>
                        <Col key={`movie-${idx}`} span={5}>
                            <MovieItem
                                url={movie.public_id}
                                title={movie.public_id}
                            />
                        </Col>)}
                </Row>
            </Col>
            <Col span={5} style={{ paddingLeft: "25px" }}>
                <h3 className={pageStyles.othersMovies}>Phim HOT</h3>
                <div>Đang cập nhật</div>
            </Col>
        </Row>
    )
}

export default Body
