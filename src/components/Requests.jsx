import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests } from '../utils/requestSlice';

export const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    console.log('Reviewing request with ID:', _id);
    if (!_id) {
      console.error('❌ Error: Request ID is undefined');
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(`URL: ${BASE_URL}/request/review/${status}/${_id}`);
      console.log('✅ Review Request Response:', res.data);
      fetchRequests(); // Refresh the requests after reviewing
    } catch (error) {
      console.error(
        '❌ Error in reviewRequest:',
        error.response?.data || error
      );
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log('✅ Fetched Requests:', res.data);
      dispatch(addRequests(res.data.connectionRequests));
    } catch (error) {
      console.error(
        '❌ Error fetching requests:',
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || !Array.isArray(requests)) return <h1>Loading...</h1>;
  if (requests.length === 0) return <h1>No requests found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        if (!request || !request.fromUserId) return null;
        const { _id, fromUserId } = request;
        const { firstName, lastName, photoUrl, age, gender, about } =
          fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl || 'https://via.placeholder.com/150'}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              <p>{about || 'No description available'}</p>
              <p>
                {age} {gender}
              </p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest('accepted', _id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest('rejected', _id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
