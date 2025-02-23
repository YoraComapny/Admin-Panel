const AppsSocialSettings = ({ data, childFunction }) => {
  return (
    <>
      <div className="w-full flex flex-col gap-2 m-3">
        <h2 className="font-semibold">Apps & Social Links</h2>

        <div className="mt-2 flex mx-2 gap-2">
          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Android App Link</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="android_app_link"
              value={data.android_app_link}
              onChange={(e) => childFunction(e)}
            />
          </div>

          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">IOS App Link</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="ios_app_link"
              value={data.ios_app_link}
              onChange={(e) => childFunction(e)}
            />
          </div>
        </div>

        <div className="mt-2 flex mx-2 gap-2">
          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Facebook</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="facebook"
              value={data.facebook}
              onChange={(e) => childFunction(e)}
            />
          </div>

          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Instagram</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="instagram"
              value={data.instagram}
              onChange={(e) => childFunction(e)}
            />
          </div>
        </div>

        <div className="mt-2 flex mx-2 gap-2">
          <div className="text-sm flex flex-col w-1/2 gap-1">
            <label className="font-semibold text-xs">Twitter</label>
            <input
              type="text"
              className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
              placeholder="Type something here..."
              name="twitter"
              value={data.twitter}
              onChange={(e) => childFunction(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppsSocialSettings;
