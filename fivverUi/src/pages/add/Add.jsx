import React from "react";
import "./add.scss";
import { useReducer } from "react";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import {useQueryClient,useMutation } from "@tanstack/react-query";
import { cards } from "../../constants/constants";
const Add = () => {
  const queryClient = useQueryClient()
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [coverImage, setCoverImage] = useState(undefined);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURES", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    if(!files || !coverImage){
      return
    }
    setUploading(true);
    try {
      const cover = await upload(coverImage);
      
      const images = await Promise.all(
        [...files].map(async (file) => await upload(file))
      );
      const imageObjects = images.map((img)=>{return {url:img}})
      const mainImages = imageObjects.map((img)=>img.url)
      setUploading(false);
      alert("Images Uploaded Successfully")
      dispatch({ type: "ADD_IMAGES", payload: { cover, mainImages } });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFeature=(feature)=>{
    dispatch({type:"REMOVE_FEATURE",payload:feature})
  }
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("gigs/createGig/",gig)
    },
    onSuccess:()=>{queryClient.invalidateQueries(['gigs'])}
  })

  const handleSubmit=async(e)=>{
    e.preventDefault()
    mutation.mutate(state)
    navigate('/my-gigs')
    console.log("This works")
  }
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <div className="lItem">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="I will do something I'm really good at"
                name="title"
                onChange={handleChange}
              />
            </div>

            <div className="lItem">
              <label htmlFor="category">Category</label>
              <select name="cat" value={state.cat}  onChange={handleChange}>
                {cards.map((card)=>(
                  <option key={card.id}>{card.cat}</option>
                ))}
              </select>
            </div>



            <div className="images">
              <div className="imgInput">
                
                  <label htmlFor="coverImg">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
              

                
                  <label htmlFor="uploadImg">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(e.target.files)}
                  />

              
              
              </div>
              <button disabled={uploading?true:false} onClick={handleUpload}>{uploading?"Uploading":"Upload"}</button>
            </div>



            <div className="lItem">
              <label htmlFor="Description">Description</label>
              <textarea
                name="desc"
                id=""
                cols="30"
                rows="16"
                placeholder="Brief description to introduce your service to customers"
                onChange={handleChange}
              ></textarea>
            </div>
            <button onClick={handleSubmit} type="submit">Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One-page web design"
              name="shortTitle"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short Description of your service"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time(e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              id=""
              min={1}
              onChange={handleChange}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              id=""
              min={1}
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" onSubmit={handleFeatures}>
              <input
                type="text"
                placeholder="e.g. page design"
              />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature,idx)=>(
                <span key={idx} className="feature" onClick={()=>removeFeature(feature)}>{feature} X</span>
              ))}
                  
            </div>
            <label htmlFor="">Price</label>
            <input type="number" min={1} name="price" onChange={handleChange} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Add;
