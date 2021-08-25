/* 
  This is the main file where all image are showing 
  In this project mostly we have used a typescript which and material ui as a third party component and
  we have used a fold and pipe for extracting a data from the api's ...
*/

import {
  Box,
  createStyles,
  makeStyles,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHttp } from "../context/httpcontext/index";
import { fold } from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import ModalPopup from "../common/ModalPop";
import Loader from "../common/Loader";

// css
const useStyle = makeStyles((theme) =>
  createStyles({
    Image: {
      height: "25%",
      width: "25%",
      padding: "50px",
    },
    popupImage: {
      height: "25%",
      width: "100%",
    },
    Box: {
      flexWrap: "wrap",
      boxSizing: "border-box",
    },
    header: {
      width: "100%",
      height: "130px",
      backgroundColor: "black",
      color: "white",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    headerText: {
      fontSize: "25px",
      textAlign: "center",
    },
    headerInputField: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      width: "25%",
    },
    noImage: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "45px",
      fontSize: "35px",
    },
    input: {
      backgroundColor: "#fffff",
      width: "90%",
      height: "35px",
      border: "none",
      "&:focus,&:active": {
        outline: "none",
      },
      borderRadius: "5px",
      padding: "6px",
      fontSize: "15px",
    },
    cardBox: {
      marginLeft: "30%",
      justifyContent: "center",
      width: "40%",
      position: "relative",
      top: "-20px",
    },
    button: {
      float: "right",
      margin: "8px",
    },
  })
);

// get all the image
const Getallimage = () => {
  const style = useStyle();
  const { getrecent, search } = useHttp(); //useHttp conext where all api are imported

  // localstate
  const [pic, setpic] = useState<Array<string>>([]);
  const [showModalList, openModal] = useState<object | any>({});
  const [showLoader, setshowLoader] = useState<boolean>(false);
  const [state, setState] = useState<object | any>({
    searchItem: "",
  });
  const [savequery, setsavequery] = useState<Array<string>>([]);

  // On reload calling this
  useEffect(() => {
    setshowLoader(true);
    Getreactimage();
  }, []);

  // calling api of image
  const Getreactimage = async () => {
    const res = await getrecent();
    pipe(
      res,
      fold(
        (e: any) => {
          console.log(e);
        },
        (data: object | any) => {
          setshowLoader(false);
          formImage(data);
        }
      )
    );
  };

  // search a item
  const searchField = async (item: string) => {
    setshowLoader(true);
    const payload: object | any = {
      searchItem: state.searchItem,
    };
    const res = await search(payload);
    pipe(
      res,
      fold(
        (e) => {
          console.log("error", e);
        },
        (data) => {
          setshowLoader(false);
          if (item === "") {
            Getreactimage();
            formImage(data);
          } else {
            formImage(data);
          }
        }
      )
    );
  };

  // Update a text field
  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    searchField(e.target.value);
  };

  // save a search query on enter
  const handleSearchItem = (e: any) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      savequrey();
    }
  };

  // save a search query
  const savequrey = () => {
    let query: Array<string> = [...savequery];
    query.push(state.searchItem);
    setsavequery(query);
  };

  //form image url
  const image_url = (pic: object | any) => {
    var srcPath: string =
      "https://farm" +
      pic.farm +
      ".staticflickr.com/" +
      pic.server +
      "/" +
      pic.id +
      "_" +
      pic.secret +
      ".jpg";
    return srcPath;
  };

  // forming a url of the image...
  // this is a common function we have used in both api
  const formImage = (resp: object | any) => {
    let picImage: Array<string> = [];
    resp?.photos?.photo?.map((pic: object | any) => {
      const srcPath = image_url(pic);
      picImage.push(srcPath);
    });
    setpic(picImage);
  };

  //clear save query
  const Clearsavequery = () => {
    setsavequery([]);
  };

  // set a search field on click to content
  const onClickcardcontent = (item: string) => {
    setState({
      ...state,
      searchItem: item,
    });
    searchField(item);
  };

  //close Properties Modal
  const onCloseDetails = () => {
    openModal({});
  };

  // content body of modal pop up
  const viewimage = (
    <img className={style.popupImage} alt="dogs" src={showModalList.imageurl} />
  );

  return (
    <Box component="header">
      {/* Loader before loading a application and after searching a item*/}
      {showLoader && <Loader />}

      {/* Common Modal pop up after clicking on image*/}
      {showModalList.imagepopup && (
        <ModalPopup
          modalTitle={"Image"}
          modalBody={viewimage}
          onCloseDetails={onCloseDetails}
          size="sm"
        />
      )}

      {/* Header section */}
      <Box className={style.header}>
        <Box className={style.headerInputField}>
          <Typography className={style.headerText}>Search Photos</Typography>
          <input
            type="text"
            name="searchItem"
            className={style.input}
            value={state.searchItem}
            placeholder="Search a Image"
            onChange={handleChange}
            onKeyDown={handleSearchItem}
          />
        </Box>
      </Box>

      {/*To Save Search Query it's only worked when you hit on enter because we cannot we put on change of input field*/}
      <Card className={style.cardBox}>
        <Box>
          {savequery.length > 0 && state.searchItem !== "" ? (
            <Box>
              {savequery.map((item) => {
                return (
                  <Box>
                    <CardContent
                      style={{ cursor: "pointer" }}
                      onClick={() => onClickcardcontent(item)}
                    >
                      {item}
                    </CardContent>
                  </Box>
                );
              })}
              <Button
                variant="contained"
                color="secondary"
                className={style.button}
                onClick={Clearsavequery}
              >
                Clear
              </Button>
            </Box>
          ) : null}
        </Box>
      </Card>

      {/* Image Rendering section and check image is empty or not */}
      <Box className={style.Box}>
        {pic.length > 0 ? (
          pic.map((image) => (
            <img
              className={style.Image}
              alt="dogs"
              src={image}
              onClick={() => {
                openModal({
                  ...showModalList,
                  imagepopup: true,
                  imageurl: image,
                });
              }}
            />
          ))
        ) : (
          <Typography className={style.noImage}>No Image</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Getallimage;
