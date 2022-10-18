import React, { useEffect } from "react";
import { Button, Card, CardGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { listGuides } from "../../actions/guidesActions";
import "./GuideList.css";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const GuideList = ({
  sectionTitle,
  sectionCreateGuideButton,
  gameId,
  guidesType,
}) => {
  const dispatch = useDispatch();

  const guideList = useSelector((state) => state.guideList);
  const { loading, guides, error } = guideList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const clickHandler = (e) => {
    if (userInfo) {
      navigate("/createguide");
    } else {
      alert("Not logged in");
    }
  };

  useEffect(() => {
    dispatch(listGuides(gameId, guidesType));
  }, [dispatch]);

  return (
    <>
      <Row>
        <div className="section section-guide">
          <div className="section-title">
            <div className="section-title-text">{sectionTitle}</div>
            {sectionCreateGuideButton === "true" && (
              <div className="section-header-button">
                <Button
                  onClick={clickHandler}
                  className={userInfo ? "notLoggedIn" : ""}
                >
                  Create new guide
                </Button>
              </div>
            )}
          </div>
          <CardGroup
            className={`section-card-list ${
              guidesType === "recent" ? "recent" : ""
            }`}
          >
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            {guides?.map((guide) => (
              <Link key={guide._id} to={`../guides/${guide._id}`}>
                <Card className="section-card">
                  <div className="section-card-head-wrapper">
                    <div className="section-card-head-icon">
                      <img src={guide.game_info[0].icon} />
                    </div>
                    <div className="section-card-head-text">
                      {guide.game_info[0].game_name}
                    </div>
                  </div>
                  <Card.Img
                    variant="top"
                    src={guide.image}
                    className="section-card-image"
                  />
                  <Card.Body>
                    <Card.Title className="section-card-title">
                      {guide.title}
                    </Card.Title>
                    <Card.Subtitle className="section-card-subtitle">
                      {guide.subtitle}
                    </Card.Subtitle>
                  </Card.Body>
                  <Card.Footer className="section-card-footer">
                    <div className="section-card-footer-stuff">
                      <div className="section-card-footer-icon">
                        <FaIcons.FaEye />
                      </div>
                      <div className="section-card-footer-text">
                        {guide.views}
                      </div>
                    </div>
                    <div className="section-card-footer-stuff">
                      <div className="section-card-footer-icon">
                        <FaIcons.FaThumbsUp />
                      </div>
                      <div className="section-card-footer-text">
                        {guide.likes}
                      </div>
                    </div>
                    <div className="section-card-footer-right">
                      <div className="section-card-footer-right-one">
                        By {guide.userInfo[0].name}
                      </div>
                      <div className="section-card-footer-right-two">
                        {guide.createdAt.substring(0, 10)}
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </CardGroup>
        </div>
      </Row>
    </>
  );
};

export default GuideList;
