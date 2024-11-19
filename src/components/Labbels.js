import React from 'react';

const obj = [
    {
        type: "Savings",
        color: "rgb(255, 0, 255)",
        percent: 45
    },
    {
        type: "Sidechick",
        color: "rgb(54, 162, 235)",
        percent: 20
    },
]

export default function Labbels() {
  return (
      <>
          {obj.map((v, i) => <LabbelComponent key={i} data={v} />)}
      </>
  )
}

function LabbelComponent({ data }) {
    if (!data) return <></>;

    // the ?? means nullish collision operator
    //which is used when something can be null
    return (
        <div className="labbels flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-3" style={{background: data.color ?? "rgb(255, 0, 255)" }}></div>
                <h3 className='text-md'>{data.type ?? ""}</h3>
            </div>
            <h3 className='font-bold'>{ data.percent ?? 0 }%</h3>
        </div>
    )
}
