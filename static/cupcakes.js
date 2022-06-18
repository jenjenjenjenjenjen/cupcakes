const BASE_URL = 'https://localhost:5000/api';

function generateHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-button">X</button>
            </li>
            <img src="${cupcake.image}"
        </div>
        `;
}

async function showCupcakes() {
    const resp = axios.get(`${BASE_URL}/cupcakes`);

    for(let data of resp.data.cupcakes) {
        let cupcake = $(generateHTML(data));
        $("#cupcakes-list").append(cupcake)
    }
}

$("#new-cupcake-form").on("submit", async function(evt) {
    evt.preventDefault()

    let flavor = $("#cupcake-flavor").val();
    let rating = $("#cupcake-rating").val();
    let size = $("#cupcake-size").val();
    let image = $("#cupcake-image").val();

    const newHTMLResponse = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor, rating, size, image
    });

    let newCupcake = $(generateHTML(newHTMLResponse.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-button", async function(evt) {
    evt.preventDefault()
    let cupcake = $(evt.target).closest("div");
    let cupcakeId = cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    cupcake.remove();
});

$(showCupcakes);