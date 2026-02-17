
function Footer({ selectedCount, onClear, onDelete }) {

    if (selectedCount === 0) return null;
    
    return (
        <footer className="sticky bottom-0 flex justify-between items-center p-4 bg-white border-t border-gray-200">
            <p className="font-medium">
                <span>{selectedCount}</span> tasks selected
            </p>
            <div className="flex gap-4">
                <button className="text-blue-500" onClick={onClear}>
                    Clear
                </button>
                <button className="text-red-500 font-bold" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </footer>
    );
}

export default Footer;