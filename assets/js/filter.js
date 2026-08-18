document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll("[data-category]")
    const posts = document.querySelectorAll(".post-item")

    filters.forEach((filter) => {
        filter.addEventListener("click", (e) => {
            e.preventDefault()
            const category = filter.dataset.category
            posts.forEach((post) => {
                const categories = post.dataset.categories.split(" ")

                if (category === "all" || categories.includes(category)) {
                    post.style.display = ""
                } else {
                    post.style.display = "none"
                }
            })
        })
    })
})