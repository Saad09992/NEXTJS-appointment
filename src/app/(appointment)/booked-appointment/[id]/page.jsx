import React from "react";
import ViewBooking from "@/components/ViewBooking";

function page({ params }) {
  const { id } = React.use(params);
  return (
    <div>
      <ViewBooking userId={id} />
    </div>
  );
}

export default page;
