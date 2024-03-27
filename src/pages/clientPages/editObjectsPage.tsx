import YMapLayout from '../../components/ymapLayout';

function EditObjectsPage() {
    return (
        <div>
            Edit object Page
            <div style={{height: '500px', width: '500px'}}>
                <YMapLayout location={{center: [27.623082, 35.75254], zoom: 3}}></YMapLayout>
            </div>
        </div>
    );
}

export default EditObjectsPage;
