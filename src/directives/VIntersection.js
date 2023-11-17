export default{
    mounted(el, binding){
        console.log(el, binding)
        const options = {
                    rootMargin: "0px",
                    threshold: 1.0,
                    };
            const callback = (entries, observer) => {
            entries.forEach((entry) => {
               if(entry.isIntersecting){
                binding.value();
               }
            });
            };
            let observer = new IntersectionObserver(callback, options);
            // за каким элементом нужно следить
            observer.observe(el)        
    },
    name:'intersection',
}