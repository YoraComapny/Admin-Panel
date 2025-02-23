const ContactInfo = ({ data, childFunction }) => {
  return (
    <>
      <div className="w-full flex flex-col m-3">
        <h2 className="font-semibold">Contact Information</h2>

        <div className="mt-4">
          <div className="text-sm flex flex-col w-full gap-1">
            <label className="font-semibold text-xs">Email</label>
            <input
              type="text"
              className="w-[95%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="email"
              value={data.email}
              onChange={(e) => childFunction(e)}
            />
          </div>
        </div>

        <div className="mt-3 text-sm flex flex-col w-full gap-1">
          <label className="font-semibold text-xs">Phone</label>
          <input
            type="text"
            className="w-[95%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
            placeholder="Type something here..."
            name="phone"
            value={data.phone}
            onChange={(e) => childFunction(e)}
          />
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
