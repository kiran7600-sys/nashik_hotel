"use client";
import React, { useState, useMemo } from "react";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tags?: string[];
}

// Full Terotale Menu Database mapped cleanly from the provided document
const FULL_MENU_DATA: Record<string, MenuItem[]> = {  
  "Mocktails & Shakes": [
    { name: "Masala Lemonade", desc: "Refreshing lemon flavor with Indian spices, ice, and carbonated water", price: "170" },
    { name: "Lovely Lemonade", desc: "Refreshing lemon flavor with lemon, ice, and carbonated water", price: "170" },
    { name: "Fresh Fruit Juice", desc: "Choice of fresh fruit juice: Watermelon, Pineapple, Orange, or Mix-Fruit", price: "180" },
    { name: "Mojito", desc: "Refreshing choice of classic, passion fruit, green apple, or strawberry flavored with sugar, lemon, ice, and carbonated water", price: "210" },
    { name: "Mixed Berry Mojito", desc: "Refreshing mixed berry flavored with sugar, lemon, ice, and carbonated water", price: "222" },
    { name: "Minty Passion Fruit Shake", desc: "Refreshing mint and indulgent passion fruit syrup perfectly balanced in a milkshake", price: "220" },
    { name: "Orange Chocolate Shake", desc: "Blend of chocolate ice cream and orange sauce", price: "220" },
    { name: "Salted Caramel Shake", desc: "The savory-sweet combination of salt & caramel", price: "220" },
    { name: "Strawberry Oreo Shake", desc: "Blend of vanilla ice cream, strawberry sauce & Oreo", price: "220" },
    { name: "Chocolate Oreo Shake", desc: "The good old cream and cookie shake now with a rich chocolaty avatar", price: "220" },
    { name: "Thick Chocolate Shake", desc: "Delicious dark chocolate sauce blended with ice cream & milk", price: "230" },
    { name: "Brownie Chocolate Shake", desc: "Blend of brownie and chocolate sauce, topped with extra brownie chunks", price: "240" },
    { name: "Mixed Berry Shake", desc: "Smooth blend of vanilla ice cream and sweet mixed berry sauce", price: "240" },
    { name: "Nutella Shake", desc: "A whole lot of Nutella blended with vanilla ice cream and a little bit more chocolate. Crafted to perfection", price: "250" }
  ],
  "Soups & Salads": [
    { name: "Cream of Soup", desc: "Your choice of Mushroom, Broccoli, Almond, Vegetable, or Tomato cream broth", price: "200" },
    { name: "Italian Exotic Soup", desc: "Blenched tomato puree with an exotic vegetable garnish, served with cheese toast", price: "220" },
    { name: "Cheese Corn Pepper Soup", desc: "Roasted corn soup flavored with cheese and fresh crushed black pepper", price: "210" },
    { name: "China Chawan", desc: "Your choice of Manchow, Hot N Sour, Lemon Coriander, Sweet Corn, or Clear soup", price: "200" },
    { name: "Terracota Hot Pot Soup", desc: "Chef's special soup filled with exotic lettuce and vegetables (Minimum 3 servings)", price: "490", tags: ["Chef Special"] },
    { name: "Tibetan Thukpa", desc: "Authentic Tibetan-style noodle soup with slow-simmered broth and rustic flavors", price: "360" },
    { name: "Tom Kha Gai", desc: "A spicy and sour hot soup with coconut milk seasoned with galangal, lemon grass, and lime leaves", price: "260" },
    { name: "Khow-Suey Soup", desc: "Vegetable soup with coconut milk and an elaborate masala of roasted spices and coconut (Minimum 3 servings)", price: "590" },
    { name: "Tom Yum Soup", desc: "Hot and sour Thai soup seasoned beautifully with fragrant spices and fresh native herbs", price: "220" },
    { name: "Wanton Soup", desc: "Hot or mild versions of delicate stuffed dumpling soup", price: "200" },
    { name: "Beijing Spice Soup", desc: "Chinese hot and spicy soup seasoned heavily with freshly cracked black pepper", price: "200" },
    { name: "Thai Broccoli Soup", desc: "Silky broccoli purée infused with Thai ginger and kaffir lime leaves, finished with coconut milk powder", price: "220" },
    { name: "Spicy Black Bean Soup", desc: "Authentic spicy black bean sauce simmered over hours with fresh field vegetables and rich stock", price: "200" },
    { name: "Flat Noodles Soup", desc: "A delicate clear broth with exotic vegetables and flat noodles, gently perfumed with toasted sesame oil", price: "290" },
    { name: "Coleslaw Salad", desc: "A cool combination of shredded carrot, cabbage, and crisp bell peppers tossed in thick mayonnaise", price: "180" },
    { name: "Caesar Salad", desc: "Fresh romaine lettuce, bell peppers, onion, and signature dressing topped with crunchy roasted croutons and shaved cheese", price: "220" },
    { name: "Tossed Salad", desc: "Cubes of assorted exotic vegetables tossed lightly in cold olive oil, fresh lemon, and crushed black pepper", price: "200" },
    { name: "Russian Salad", desc: "Perfect cubes of French beans, potato, carrot, pineapple, and sweet green peas in a rich creamy dressing", price: "200" },
    { name: "Waldorf Salad", desc: "Crisp apple cubes paired with crunchy walnuts and fresh parsley in a premium creamy mayonnaise dressing", price: "220" },
    { name: "Greek Salad", desc: "Assorted lettuce greens and rich feta cheese with olives, tomato, and cucumber tossed in a sharp luxury vinaigrette", price: "240" },
    { name: "Apple Broccoli Salad", desc: "Crisp apple cubes and tender broccoli florets drizzled with a delicate honey mustard glaze", price: "260" },
    { name: "Lettuce & Pasta Salad", desc: "Crisp iceberg lettuce and al dente macaroni, coated in a silky dressing and garnished with sweet candied pistachios", price: "250" }
  ],
  "Tandoori & Starters": [
    { name: "Rumali Khakra", desc: "Indian crispy rolled paper-thin bread served with clarified butter, cheese, and spicy crushed peanuts", price: "270", tags: ["Jain Available"] },
    { name: "Kaju Cheese Kebab", desc: "Processed cheese, artisanal cottage cheese mixed with crushed cashews and cardamon powder aroma", price: "410" },
    { name: "Paneer Cheese Chilli Garlic Kebab", desc: "Mélange of cottage cheese, garlic powder, and bell peppers topped with layers of hot melted cheese", price: "410" },
    { name: "Paneer Tikka", desc: "All-time favorite clay-oven choices: Achari, Malai, Banjara, Pahadi, or Pudina marinade", price: "390" },
    { name: "Aloo Nazaket", desc: "Earthapple stuffed with cheese, grated paneer, nuts, and sweet raisins cooked in a clay pot oven", price: "340" },
    { name: "Chonke Hue Matter Aloo Ki Tikki", desc: "Crisp-fried tikki of mashed green peas and potato, filled entirely with molten Amul cheese", price: "350" },
    { name: "Kandhari Mushroom", desc: "Fresh button mushrooms stuffed with spiced cheese and roasted golden in the tandoor", price: "380" },
    { name: "Tandoori Khazana", desc: "Special grand display of five types of selected premium tandoori starters from the house", price: "790", tags: ["Signature"] },
    { name: "Paneer Angara Kebab", desc: "Spicy fire-cooked cottage cheese served sizzling on a hot iron plate", price: "440" },
    { name: "Sarson Ke Phool", desc: "Fresh broccoli florets marinated with sharp Kasundi mustard, hung curd, and tandoori spices", price: "390" },
    { name: "Soya Mutter Ke Seekh", desc: "Soya chunk and green vegetable kebabs, marinated in Indian spices and slow-cooked over coals", price: "340" },
    { name: "Makai Sesame Seekh", desc: "American sweet corn, potato, and paneer medley, gently spiced and slow-cooked in the tandoor", price: "360" },
    { name: "Paneer Badami Tikka", desc: "Tender paneer cubes coated in a creamy almond crust and yoghurt marinade, delicately grilled", price: "400" },
    { name: "Gulkandi Paneer Tikka", desc: "Chargrilled cottage cheese tikka filled with sweet, fragrant rose petal preserves chutney", price: "430", tags: ["Chef Special"] },
    { name: "Dum Ka Matka Aloo", desc: "Clay-pot roasted baby potatoes, gently dum-cooked in a traditional earthen matka", price: "360" },
    { name: "Kandhari Paneer Tikka", desc: "Yoghurt-marinated cottage cheese, chargrilled and delicately stuffed with cheese and pomegranate pearls", price: "390" },
    { name: "Kaju Methi Tikki", desc: "Crispy galette made from fresh fenugreek leaves and mashed potato with Indian spices, garnished with cashews", price: "340" },
    { name: "Thecha Paneer", desc: "Paneer cubes tossed in pure ghee and coated with a fiery, authentic Maharashtrian green-chilli thecha", price: "380", tags: ["Spicy"] },
    { name: "Jain Tikki", desc: "Special raw banana patty coated over crispy bread crumbs and deep-fried golden", price: "360", tags: ["Jain Available"] },
    { name: "Cheese Blast Ball", desc: "Parboiled potato spheres stuffed completely with processing cheese and spicy red chilli flakes", price: "360" },
    { name: "Cheese Bruschetta", desc: "Toasted garlic bread loaded with mushroom, tomato, onion, and basil topped with broiled mozzarella", price: "330" },
    { name: "Mexican Cheese Cigar", desc: "Cheese slices stuffed with spicy Mexican salsa, wrapped in breadcrumbs and deep-fried crisp", price: "420" },
    { name: "Cheese Chilli Garlic Naanza", desc: "Flat tandoori bread base topped with cheese, dynamic green chillies, garlic, and clay-oven roasted paneer", price: "360" },
    { name: "Kafir Lime Jalapeno Paneer Chilli", desc: "Crisp paneer cubes wok-tossed and accented with clean kafir lime and fiery sliced jalapeño elements", price: "360" },
    { name: "Exotic Cheese Finger", desc: "Crisp-fried exotic vegetables and fresh organic herbs bound together with premium molten mozzarella", price: "420" }
  ],
  "Indian Main Course": [
    { name: "Angoori Mutter Hara Pyaza", desc: "Indian spices in a rich creamy gravy base cooked down with cheese cubes and fresh spring onion", price: "370" },
    { name: "Paneer Khushnuma", desc: "Delicate paneer rolls stuffed with signature spices, served inside a premium cashew and onion cream reduction", price: "380" },
    { name: "Subzi Bemisal", desc: "Traditional vegetable kofta dumplings served inside a spicy, buttery tomato & onion reduction", price: "360" },
    { name: "Paneer Haji Ali", desc: "A special heritage cottage cheese preparation inspired by the culinary street legacy of Mumbai", price: "390" },
    { name: "Khade Masale Ka Paneer", desc: "Tender cottage cheese cubes delicately spiced with freshly cracked black peppercorns, crushed coriander seeds, and toasted cumin", price: "390" },
    { name: "Hariyali Kofta", desc: "Mashed potato and paneer kofta dumplings bathed in a vibrant green spinach gravy spiced with green chillies", price: "380" },
    { name: "Mawa Malai Kofta", desc: "Cottage cheese dumplings filled with authentic sweet mawa and garden vegetables, simmered in a velvety cashew cream gravy", price: "390" },
    { name: "Delhiwala Butter Paneer", desc: "Rich triangles of fresh paneer cooked down inside a smooth, heavily-buttered tomato gravy", price: "400" },
    { name: "Veg Nariyali Korma", desc: "Our signature garden vegetable preparation cooked down and served inside fresh tender coconut water", price: "440", tags: ["Signature"] },
    { name: "Makhana Methi Ka Mutter", desc: "Tender toasted lotus seeds and sweet green peas simmered with rich dried fenugreek leaves in a cashew base", price: "410" },
    { name: "Kaju Masala", desc: "Whole roasted cashew nuts cooked inside a classic tomato and onion gravy finished with rich dairy butter", price: "420" },
    { name: "Paneer Lazeez", desc: "Paneer cubes enveloped in a velvety, spice-infused luxury sauce, delivering exquisite multi-layered flavor", price: "410" },
    { name: "Jay Viru (Veg Sham Sabera)", desc: "A masterful presentation of two distinct contrasting gravies flanking artisanal spinach-paneer dumplings", price: "480", tags: ["Chef Special"] },
    { name: "Cheese Butter Masala", desc: "Generous cubes of processed cheese moderately seasoned inside a bright buttery tomato sauce", price: "460" },
    { name: "Paneer Lababdar", desc: "Roasted cottage cheese chunks cooked in a combination gravy accented with a distinct tandoori smoky finish", price: "390" },
    { name: "Paneer Afghan Ke Diwane", desc: "Tender paneer cubes simmered in a velvety cashew-onion gravy, enriched with butter and aromatic traditional spices", price: "410" },
    { name: "Rajastani Malai Paneer Pyaz", desc: "Tender paneer cubes and caramelized pearl onions simmered in a luxurious cashew-onion gravy", price: "410" }
  ],
  "Pasta, Pizza & Sizzlers": [
    { name: "Paneer Tikka Mac Cheese Lasagne", desc: "An architectural three-layered baked pasta masterfully bridging Indo-Continental profiles", price: "450", tags: ["Signature"] },
    { name: "Baked Double Cheese Pasta", desc: "Macaroni pasta paired with exotic vegetables, loaded with double cheese layers, and baked golden", price: "480" },
    { name: "Penne Arrabiata Pasta", desc: "A spicy pasta made from extra virgin olive oil, slow-cooked plum tomato reduction, garlic, and fresh herbs", price: "410" },
    { name: "Margarita Pizza", desc: "Traditional classic Italian thin-crust pizza topped with house pomodoro, a clean cheese blend, and seasoning", price: "420", tags: ["Jain Available"] },
    { name: "Fungi Pizza", desc: "Tender grilled earth-mushrooms topped with fresh sweet basil leaf, rich tomato reduction, and melted mozzarella", price: "430" },
    { name: "Tandoori Paneer Pizza", desc: "Clay-oven smoked cottage cheese cubes spread across a pizza base topped with stringy mozzarella", price: "430" },
    { name: "Quattro Formaggi Pizza", desc: "Artisan thin-crust pizza layered with a rich blend of four cheeses, accented with cottage cheese and herbs", price: "520" },
    { name: "Italian Sizzler", desc: "A piping hot combination of tossed pasta, assorted exotic vegetables, black pepper reduction, and house sauces", price: "480" },
    { name: "Jain Sizzler", desc: "Grilled cottage cheese slabs, raw banana patties, assorted vegetables, and herb rice draped in a light cream reduction", price: "480", tags: ["Jain Available"] },
    { name: "Indian Sizzler", desc: "Spicy clay-oven paneer tikka masala skewers paired with seasoned rice and served along with fresh tandoori roti", price: "470" },
    { name: "Cottage Steak Sizzler", desc: "Grilled cottage cheese steaks, rich wild mushroom sauce, sautéed garden greens, parsley rice, and golden hand-cut fries", price: "490" }
  ]
};

type MenuCategory = keyof typeof FULL_MENU_DATA;

export default function MenuHighlights() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Mocktails & Shakes");
  const [filterJain, setFilterJain] = useState(false);

  // Filter menu items dynamically if Jain-only is chosen
  const filteredItems = useMemo(() => {
    const items = FULL_MENU_DATA[activeCategory] || [];
    if (!filterJain) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes("jain") || 
      item.desc.toLowerCase().includes("jain") || 
      (item.tags && item.tags.some(t => t.includes("Jain")))
    );
  }, [activeCategory, filterJain]);

  return (
    <section id="menu" className="py-28 bg-cream text-espresso relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-espresso/10 pb-8 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-terracotta mb-3 block font-semibold font-body">The Terotale Experience</span>
            <h2 className="text-4xl md:text-6xl font-heading tracking-wide text-forest">Our Culinary Journal</h2>
          </div>
          
          {/* Quick Dietary Toggle Switch */}
          <div className="mt-6 md:mt-0 flex items-center gap-3 bg-offwhite border border-espresso/15 px-4 py-2.5 rounded-sm shadow-sm">
            <label htmlFor="jain-filter" className="text-xs uppercase tracking-widest font-semibold text-espresso/70 cursor-pointer font-body">
              Show Jain Options Only
            </label>
            <input 
              id="jain-filter"
              type="checkbox" 
              checked={filterJain}
              onChange={() => setFilterJain(!filterJain)}
              className="w-4 h-4 accent-terracotta cursor-pointer rounded-sm"
            />
          </div>
        </div>

        {/* Master Interface Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Left Category Navigation Sidebar */}
          <aside className="lg:w-1/4 lg:sticky lg:top-28 h-fit z-30 bg-cream py-2">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar border-b lg:border-b-0 lg:border-l border-espresso/15 pl-1">
              {(Object.keys(FULL_MENU_DATA) as MenuCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left text-xs uppercase tracking-widest font-bold py-3 px-4 transition-all duration-300 whitespace-nowrap lg:whitespace-normal rounded-sm cursor-pointer ${
                    activeCategory === category 
                      ? "bg-forest text-offwhite shadow-md lg:-ml-2" 
                      : "text-espresso/60 hover:text-forest hover:bg-sage/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          {/* Right Menu Content Grid Display */}
          <main className="lg:w-3/4 min-h-[400px]">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-espresso/20 bg-offwhite/50">
                <p className="text-espresso/40 font-heading text-lg italic">No specialized items match your criteria in this section.</p>
                <button 
                  onClick={() => setFilterJain(false)} 
                  className="mt-4 text-xs uppercase tracking-widest font-bold text-terracotta underline cursor-pointer font-body"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {filteredItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group flex flex-col justify-between border-b border-espresso/10 pb-6 transition-all duration-300 hover:border-sage/50"
                  >
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-heading tracking-wide text-forest group-hover:text-terracotta transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="w-px flex-grow mx-4 border-b border-dotted border-espresso/20 group-hover:border-sage/50" />
                        <span className="text-sm font-medium text-forest tracking-wider font-mono">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-espresso/60 font-light text-xs sm:text-sm leading-relaxed mb-4 font-body">
                        {item.desc}
                      </p>
                    </div>

                    {/* Auto Tag Generator based on names/descriptions */}
                    <div className="flex gap-2 flex-wrap font-body">
                      {(item.name.toLowerCase().includes("chef") || (item.tags && item.tags.includes("Chef Special"))) && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-terracotta/10 text-terracotta border border-terracotta/30 font-semibold">
                          Chef Special
                        </span>
                      )}
                      {(item.name.toLowerCase().includes("jain") || item.desc.toLowerCase().includes("jain") || (item.tags && item.tags.includes("Jain Available"))) && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-sage/10 text-sage border border-sage/30 font-semibold">
                          Jain Option
                        </span>
                      )}
                      {(item.name.toLowerCase().includes("signature") || (item.tags && item.tags.includes("Signature"))) && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-forest text-offwhite font-semibold">
                          Signature
                        </span>
                      )}
                      {item.desc.toLowerCase().includes("spicy") && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 font-semibold">
                          Spicy
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </section>
  );
}
