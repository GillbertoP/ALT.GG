import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
  ContentState,
  CompositeDecorator,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./ViewGuide.css";
import JumboGames from "../../components/JumboGames/JumboGames";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { viewGuide } from "../../actions/guidesActions";
import Loading from "../../components/Loading";

const ViewGuide = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const guidePath = location.pathname; // something like /guides/{guideId}

  const guideView = useSelector((state) => state.guideView);
  const { loading, guide, error } = guideView;

  const { edit, setEdit } = useState(false);

  const content = guide ? guide[0].content : "";

  //   const editorContent = guide
  //     ? EditorState.createWithContent(convertFromHTML(JSON.stringify(content)))
  //     : EditorState.createEmpty();

  //  fix this mess later
  //    from here
  const editorContent = guide ? convertFromHTML(JSON.stringify(content)) : null;
  const editorContentA = guide
    ? ContentState.createFromBlockArray(
        editorContent.contentBlocks,
        editorContent.entityMap
      )
    : null;
  const editorContentB = guide
    ? EditorState.createWithContent(editorContentA)
    : EditorState.createEmpty();
  //  to here

  const [guideFormData, setGuideFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      guideTitle: "",
      guideSubtitle: "",
      gameId: "",
      category: "",
      editorState: editorContentB,
    }
  );

  const onEditorStateChange = (editorState) => {
    setGuideFormData({ editorState: editorState });
  };

  useEffect(() => {
    dispatch(viewGuide(guidePath));
  }, [dispatch]);
  return (
    <>
      {loading && <Loading />}
      {guide && (
        <div className="main">
          {/* fix this later */}
          <JumboGames
            gameId={guide[0].game_id}
            jumboTitle={`Viewing Guide for ${
              guide[0].game_id === "2" ? "Dota 2" : "Monster Hunter: Rise"
            }`}
            jumboSubtitle1={guide[0].title}
            jumboSubtitle2={`By ${guide[0].userInfo[0].name}`}
            jumboSubtitle3={guide[0].createdAt.substring(0, 10)}
            jumboViews={guide[0].views}
            jumboLikes={guide[0].likes}
            gameBg={
              guide[0].game_id === "2"
                ? "https://res.cloudinary.com/seproject/image/upload/v1648037348/Games/Backgrounds/dota2_bxlf2y.webp"
                : "https://res.cloudinary.com/seproject/image/upload/v1648037349/Games/Backgrounds/mhrise_j4dcpk.jpg"
            }
          />
          <Container fluid>
            <Form autoComplete="off">
              <div className="section section-post">
                <div className="section-post-title-inner">
                  <Form.Group controlId="guideFormTitle">
                    <Form.Control
                      type="text"
                      placeholder="Enter Guide Title"
                      value={
                        edit
                          ? guideFormData.guideTitle || ""
                          : guide[0].title || ""
                      }
                      onChange={(e) =>
                        setGuideFormData({ guideTitle: e.target.value })
                      }
                      readOnly={edit ? false : true}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="guideFormSubtitle">
                    <Form.Control
                      type="text"
                      placeholder="Enter Guide Subtitle"
                      value={
                        edit
                          ? guideFormData.guideSubtitle || ""
                          : guide[0].subtitle || ""
                      }
                      onChange={(e) =>
                        setGuideFormData({ guideSubtitle: e.target.value })
                      }
                      readOnly={edit ? false : true}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </div>
              {edit && (
                <div className="section">
                  <div className="section-post-inner">
                    <Editor
                      editorState={guideFormData.editorState}
                      wrapperClassName="wrapper-class"
                      editorClassName={`editor-class ${
                        edit ? "edit" : "no-edit"
                      }`}
                      toolbarClassName={`toolbar-class ${
                        edit ? "edit" : "no-edit"
                      }`}
                      readOnly={edit ? false : true}
                      onEditorStateChange={onEditorStateChange}
                    />
                  </div>
                </div>
              )}
              <div className="section">
                <div className="section-post-inner">
                  <div
                    className="guide-content"
                    dangerouslySetInnerHTML={{ __html: guide[0].content }}
                  />
                </div>
              </div>
              {edit && (
                <div className="guide-submit-button">
                  <Button variant="secondary" type="submit">
                    Post Guide
                  </Button>
                </div>
              )}
            </Form>
          </Container>
        </div>
      )}
    </>
  );
};

export default ViewGuide;
