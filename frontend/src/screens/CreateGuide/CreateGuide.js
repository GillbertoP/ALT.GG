import React, { Component, useEffect, useReducer, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import "./CreateGuide.css";
import JumboGames from "../../components/JumboGames/JumboGames";
import { useDispatch, useSelector } from "react-redux";
import { createGuideAction } from "../../actions/guidesActions";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

const CreateGuide = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const guideList = useSelector((state) => state.guideList);
  const { loading, guides, error } = guideList;

  const guideCreate = useSelector((state) => state.guideCreate);
  const { success: successCreate } = guideCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [passGameId, setPassGameId] = useState("");

  const [guideFormData, setGuideFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      guideTitle: "",
      guideSubtitle: "",
      gameId: guides[0].game_id,
      category: "empty",
      editorState: EditorState.createEmpty(),
    }
  );

  const onEditorStateChange = (editorState) => {
    setGuideFormData({ editorState: editorState });
  };

  const resetHandler = () => {
    setGuideFormData({
      guideTitle: "",
      guideSubtitle: "",
      gameId: passGameId,
      category: "empty",
      editorState: EditorState.createEmpty(),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !guideFormData.guideTitle ||
      !guideFormData.guideSubtitle ||
      !guideFormData.gameId ||
      !guideFormData.category ||
      !guideFormData.editorState
    ) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(
      createGuideAction(
        guideFormData.guideTitle,
        guideFormData.guideSubtitle,
        draftToHtml(
          convertToRaw(guideFormData.editorState.getCurrentContent())
        ),
        guideFormData.gameId,
        guideFormData.category
      )
    );

    alert("Guide added");
    resetHandler();
    navigate("/");
  };

  useEffect(() => {
    if (!userInfo) {
      alert("Not logged in!");
      resetHandler();
      navigate("/");
    }

    if (!guides[0]) {
      alert(
        "Invalid query, please go back to guide list and create guide through there!"
      );
      navigate("/");
    } else {
      setPassGameId(guides[0].game_id);
    }
  }, [dispatch, successCreate, navigate, userInfo]);
  return (
    <div className="main">
      {/* fix this later */}
      <JumboGames
        gameId="2"
        jumboTitle={`Creating Guide for ${
          passGameId === "2" ? "Dota 2" : "Monster Hunter: Rise"
        }`}
        gameBg={
          passGameId === "2"
            ? "https://res.cloudinary.com/seproject/image/upload/v1648037348/Games/Backgrounds/dota2_bxlf2y.webp"
            : "https://res.cloudinary.com/seproject/image/upload/v1648037349/Games/Backgrounds/mhrise_j4dcpk.jpg"
        }
      />
      <Container fluid>
        <Form onSubmit={submitHandler} autoComplete="off">
          <div className="section section-post">
            <div className="section-title">Guide Header</div>
            <div className="section-post-title-inner">
              <Form.Group controlId="guideFormTitle">
                <Form.Control
                  type="text"
                  placeholder="Enter Guide Title"
                  value={guideFormData.guideTitle || ""}
                  onChange={(e) =>
                    setGuideFormData({ guideTitle: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="guideFormSubtitle">
                <Form.Control
                  type="text"
                  placeholder="Enter Guide Subtitle"
                  value={guideFormData.guideSubtitle || ""}
                  onChange={(e) =>
                    setGuideFormData({ guideSubtitle: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </div>
          </div>
          <div className="section">
            <div className="section-title">Guide Body</div>
            <div className="section-post-inner">
              <Editor
                editorState={guideFormData.editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </div>
          {error && error.errorMessage ? (
            <ErrorMessage variant="danger">{error.errorMessage}</ErrorMessage>
          ) : null}
          <div className="guide-submit-button">
            <Button variant="secondary" type="submit">
              Post Guide
            </Button>
          </div>
        </Form>
        {/* <textarea
          disabled
          value={draftToHtml(
            convertToRaw(guideFormData.editorState.getCurrentContent())
          )}
        /> */}
      </Container>
    </div>
  );
};

export default CreateGuide;
