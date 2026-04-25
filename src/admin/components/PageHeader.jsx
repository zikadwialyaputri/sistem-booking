export default function PageHeader() {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-6 bg-transparent">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-bold text-white">
                    Dashboard Overview
                </span>

                <div id="breadcrumb-links" className="flex items-center text-sm font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-blue-100 opacity-80 hover:text-white cursor-pointer">Admin</span>
                    <span id="breadcrumb-separator" className="text-blue-100 opacity-50">/</span>
                    <span id="breadcrumb-current" className="text-white font-semibold">Statistik Booking</span>
                </div>
            </div>

            <div id="action-button">
                <button 
                    id="add-button" 
                    className="bg-white text-blue-600 hover:bg-blue-50 transition-all font-bold px-6 py-2.5 rounded-lg shadow-lg flex items-center active:scale-95"
                >
                    <span className="mr-2 text-xl">+</span> Tambah Booking
                </button>
            </div>
        </div>
    );
}