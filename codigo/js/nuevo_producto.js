        let uploadedImages = [];

        function goBack() {
            if (confirm('¿Estás seguro de que quieres salir? Se perderán los cambios no guardados.')) {
                window.history.back();
            }
        }

        function cancelForm() {
            if (confirm('¿Estás seguro de que quieres cancelar? Se perderán todos los cambios.')) {
                document.getElementById('productForm').reset();
                uploadedImages = [];
                updateImagePreview();
                updatePhotoCounter();
            }
        }

        function handleImageUpload(event) {
            const files = Array.from(event.target.files);
            
            files.forEach(file => {
                if (uploadedImages.length < 10 && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        uploadedImages.push({
                            file: file,
                            url: e.target.result,
                            id: Date.now() + Math.random()
                        });
                        updateImagePreview();
                        updatePhotoCounter();
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Reset input
            event.target.value = '';
        }

        function removeImage(imageId) {
            uploadedImages = uploadedImages.filter(img => img.id !== imageId);
            updateImagePreview();
            updatePhotoCounter();
        }

        function updateImagePreview() {
            const container = document.getElementById('imagePreview');
            
            // Clear existing content
            container.innerHTML = '';
            
            // Add uploaded images
            uploadedImages.forEach(image => {
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';
                imageItem.innerHTML = `
                    <img src="${image.url}" alt="Imagen subida" class="w-full h-full object-cover">
                    <button type="button" class="remove-image hover:bg-white hover:text-red-500 transition-colors" onclick="removeImage(${image.id})">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                `;
                container.appendChild(imageItem);
            });
            
            // Add upload placeholder if less than 10 images
            if (uploadedImages.length < 10) {
                const placeholder = document.createElement('div');
                placeholder.className = 'upload-placeholder';
                placeholder.onclick = () => document.getElementById('imageInput').click();
                placeholder.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <div class="upload-text">Agregar foto</div>
                `;
                container.appendChild(placeholder);
            }
        }

        function updatePhotoCounter() {
            document.getElementById('photoCounter').textContent = `${uploadedImages.length}/10`;
        }

        function submitForm(event) {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('productName').value,
                category: document.getElementById('category').value,
                condition: document.getElementById('condition').value,
                description: document.getElementById('description').value,
                exchangePreferences: document.getElementById('exchangePreferences').value,
                location: document.getElementById('location').value,
                images: uploadedImages
            };
            
            // Validate required fields
            if (!formData.name || !formData.category || !formData.condition) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }
            
            // Here you would typically send the data to your backend
            console.log('Form data:', formData);
            alert('¡Publicación guardada exitosamente!');
        }

        // Initialize
        updatePhotoCounter();