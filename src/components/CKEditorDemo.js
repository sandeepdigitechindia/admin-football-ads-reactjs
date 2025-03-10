import React from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

const CKEditorDemo = () => {
    const cloud = useCKEditorCloud( {
        version: '44.3.0',
        premium: true
    } );

    if ( cloud.status === 'error' ) {
        return <div>Error!</div>;
    }

    if ( cloud.status === 'loading' ) {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic
    } = cloud.CKEditor;

    const { FormatPainter } = cloud.CKEditorPremiumFeatures;

    return (
        <CKEditor
            editor={ ClassicEditor }
            data={ '<p>Hello world!</p>' }
            config={ {
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDI4NjA3OTksImp0aSI6IjM2ZDg3NjkxLTBjNzctNGQwMS04MTE0LWQyZmQwNjJkZDFjNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijk1OTMyOWZlIn0.rZLaPxMn3phdKheRCNdzN1B18vtWVSeq7jkmI4OkT6h9dRwTddSg12OG6yvNegWSVYHr9hXddDB6zerCUB-WwQ',
                plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ]
            } }
        />
    );
};

export default CKEditorDemo;