import React, { useState } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget() {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => console.log(blob));
    }
  }
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" content="STEP 1 - ADD PHOTO" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" content="STEP 2 - RESIZE IMAGE" />
        {files && files.length > 0 && <Image src={files[0].preview} />}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" content="STEP 3 - PREVIEW & UPLOAD" />
      </Grid.Column>
    </Grid>
  );
}
