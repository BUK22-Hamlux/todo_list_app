

function Overlay({ onClose }){
    return(
        <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        />
    )
}

export default Overlay;