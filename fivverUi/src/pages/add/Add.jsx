import React from 'react'
import './add.scss'
const Add = () => {
  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <div className="lItem">
              <label htmlFor="title">Title</label>
              <input type="text" placeholder="I will do something I'm really good at" />
            </div>

            <div className="lItem">
              <label htmlFor="category">Category</label>
              <select name="cats" id="cats">
                <option value="design">Design</option>
                <option value="web development">Web Developement</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>
            </div>


            <div className="lItem upimg">
              <label htmlFor="coverImg">Cover Image</label>
              <input type="file" />
            </div>

            <div className="lItem upimg">
              <label htmlFor="uploadImg">Upload Images</label>
              <input type="file" multiple />
            </div>

            
            <div className="lItem">
              <label htmlFor="Description">Description</label>
              <textarea name="" id="" cols="30" rows="16" placeholder='Brief description to introduce your service to customers'></textarea>
            </div>
            <button>
              Create
            </button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" placeholder='e.g. One-page web design' />
            <label htmlFor="">Short Description</label>
            <textarea name="" id="" cols="30" rows="10" placeholder='Short Description of your service'></textarea>
            <label htmlFor="">Delivery Time(e.g. 3 days)</label>
            <input type="number" name="" id="" min={1} />
            <label htmlFor="">Revision Number</label>
            <input type="number" name="" id="" min={1} />
            <label htmlFor="">Add Features</label>
            <input type="text" placeholder='e.g. page design' />
            <input type="text" placeholder='e.g. file uploading' />
            <input type="text" placeholder='e.g. setting up a domain' />
            <input type="text" placeholder='e.g. hosting' />
            <label htmlFor="">Price</label>
            <input type="number" min={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add