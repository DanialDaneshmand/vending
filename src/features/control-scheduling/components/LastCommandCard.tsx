const LastCommandCard = () => {
  const details = [
    { label: 'دستور', value: 'روشن' },
    { label: 'وضعیت', value: 'اعمال شد', isStatus: true },
    { label: 'زمان ارسال', value: '۱۴۰۳/۰۶/۲۴ ۱۰:۰۳' },
    { label: 'زمان اعمال', value: '۱۴۰۳/۰۶/۲۴ ۱۰:۰۳' },
    { label: 'درخواست‌دهنده', value: 'علی محمدی' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100  h-full">
      <span className="text-gray-800 font-bold text-sm block mb-4  w-full ">نتیجه آخرین دستور</span>
      <div className=" space-y-2">
        {details.map((item, idx) => (

          <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 font-bold">{item.label}</span>
            <span className={`font-bold ${item.isStatus ? 'text-green-600 bg-green-50 px-2 py-0.5 rounded-md' : 'text-gray-600'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastCommandCard