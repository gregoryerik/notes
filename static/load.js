

function load_notes() {
    fetch('/api/items/all', {
    headers: {
        'Accept': 'application/json'
    }})
    .then(response => response.json())
    .then(notes => {
        if (notes){
            notes._items.forEach(note => {
                display_note(note);
            });
        }
    });
}

function display_note(note) {
    let container = document.getElementById('notes_container');
    container.innerHTML += create_card_from_note(note["name"], note["note"])
}

function create_card_from_note(title, desc) {
    return `<div class="card border-dark-low p-6 mb-4 bg-light radius-base">
                <div class="card-head">
                    <h2 class="heading-medium">
                        <a href="#" onclick="delete_item(1)">${title}</a>
                    </h2>
                </div>
                <div class="card-body mt-3">
                    <p class="text-medium">${desc}</p>
                </div>
            </div>`
}

function open_modal() {

}

function delete_item(item_id) {
    Swal.fire({
        title: 'Warning!',
        text: 'Are you sure you want to delete?',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: "No, Cancel",
        cancelButtonColor: '#d33'
      })
}