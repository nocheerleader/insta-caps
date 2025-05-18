"use client"; // This directive marks the component as a Client Component

import React, { useRef } from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui button is here
import { useUiStore, type UiState } from "@/store/uiStore"; // <-- Import the store and UiState

// No props needed if all interaction is via store
// interface UploadButtonProps {}

const UploadButton: React.FC = () => {
  // <-- Removed props
  // useRef to access the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get state and actions from the Zustand store
  const { setImageFile, imageFile } = useUiStore((state: UiState) => ({
    setImageFile: state.setImageFile,
    imageFile: state.imageFile,
    // imagePreviewUrl is managed by the store, no need to select for direct cleanup here
  }));

  // Function to trigger the hidden file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle the file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Use the store action
      console.log("Selected file and set in store:", file);
    } else {
      setImageFile(null); // Clear the file in the store if selection is cancelled
    }
  };

  // The store's `setImageFile` and `resetToUpload` actions are responsible for
  // revoking the imagePreviewUrl. A useEffect here for that specific purpose
  // is likely not needed and could be redundant.
  // useEffect(() => {
  //   // Cleanup logic if this component were creating/owning a local object URL
  //   return () => {
  //     // Example: if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
  //   };
  // }, []); // Or [imageFile] if URL was derived from it locally

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*" // Accept only image files
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Keep it hidden
        // Keying the input by imageFile?.name ensures it resets if the same file is "re-selected"
        // after being cleared, allowing onChange to fire again.
        key={imageFile?.name || "empty"}
      />
      {/* Styled button from shadcn/ui */}
      <Button onClick={handleButtonClick}>
        {imageFile ? `Selected: ${imageFile.name}` : "Upload Image"}
      </Button>
      {/* We can add a message or rely on the button text changing */}
      {/* {!selectedFileName && <p className="text-sm text-muted-foreground mt-2">No image selected.</p>} */}
    </div>
  );
};

export default UploadButton;
