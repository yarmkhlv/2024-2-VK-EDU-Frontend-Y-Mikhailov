interface IPropsSwapBtn {
    className?: string;
    onClick: () => void;
}

export function SwapBtn({ className, onClick }: IPropsSwapBtn) {
    return (
        <button className={className} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
            >
                <path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" />
            </svg>
        </button>
    );
}
