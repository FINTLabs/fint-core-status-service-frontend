type props = {
    maxValue: number;
    value: number;
};

export default function CircularProgressBar({maxValue, value}: props) {

    const currentValue: number = Math.round((value / maxValue) * 100);
    const valueOffset: number = 450 - (value * 4.5);
    return (
        <div className={"h-32 w-32 relative"}>
            <div className={"h-32 w-32 rounded-full p-4 shadow-lg drop-shadow-2xl"}
                 style={{
                     boxShadow: "2px 2px 6px -1px #F76650",
                 }}
            >
                <div className={"h-24 w-24 rounded-full flex items-center justify-center"}
                     style={{
                         boxShadow: "inset 2px 2px 6px -1px #F76650",
                     }}
                >
                    <p className={"text-3xl pl-2"}>{currentValue}%</p>
                </div>
            </div>
            <svg xmlns={"https://www.w3.org/200/svg"} version={"1.1"} width={"128px"} height={"128px"}
                 className={"absolute top-0 left-0"}>
                <defs>
                    <linearGradient id={"CircularProgressBarGradient"}>
                        <stop offset={"0%"}
                              stopColor={"#7F78E8"}/>
                        <stop offset={"100%"}
                              stopColor={"#6B133D"}/>
                    </linearGradient>
                </defs>
                <circle cx="64" cy="64" r="56" strokeLinecap={"round"} fill={"none"}
                        stroke="url(#CircularProgressBarGradient)"
                        strokeDasharray={450}
                        strokeDashoffset={valueOffset}
                        strokeWidth={"16px"}
                />
            </svg>
        </div>
    )
}
