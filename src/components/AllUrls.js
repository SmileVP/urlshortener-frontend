import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";


function AllUrls() {
  let [item, setItem] = useState([]);

  //redirect to url link
  const handleRedirectUrl = async (shortUrl) => {
    try {
      let id = shortUrl;
      let urlValue = id.shortUrl;
      let res = await axios.post(`${url}/users/redirect/${urlValue}`);
      if (res.status === 200) {
        //open the link in new window
        window.open(res.data.urlDetails, "_blank");
        //calling get url to update the count
        getAllUrl();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for getting all orders
  const getAllUrl = async () => {
    try {
      let res = await axios.get(`${url}/users/getUrls`);

      if (res.status === 200) {
        setItem(res.data.urls);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    getAllUrl();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="text-white">
        <div className="all-urls p-2">
          <Table bordered className="mt-2 text-center">
            <thead className="text-danger">
              <tr>
                <th>S.No</th>
                <th>Email</th>
                <th>Long-Url</th>
                <th>Short-Url</th>
                <th>Click-Count</th>
                <th>Created on</th>
                <th>Redirect</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {item.map((e, i) => {
                if (e !== []) {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.email}</td>
                      <td>{e.longurl}</td>
                      <td>{e.shorturl}</td>
                      <td>{e.clicks}</td>
                      <td>{new Date(e.time).toLocaleDateString("en-UK")}</td>
                      <td>
                        {" "}
                        <Button
                          variant="link"
                          onClick={() =>
                            handleRedirectUrl({ shortUrl: e.shorturl })
                          }
                        >
                          {e.shorturl}
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AllUrls;
