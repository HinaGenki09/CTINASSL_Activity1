
import { useState, useEffect } from "react";
import "./App.css";

const defaultMolecules = [
  {
    id: 1,
    name: "Water",
    formula: "H₂O",
    description: "An essential compound needed by living organisms.",
    category: "Compound",
  },
  {
    id: 2,
    name: "Carbon Dioxide",
    formula: "CO₂",
    description: "A gas used by plants during photosynthesis.",
    category: "Compound",
  },
  {
    id: 3,
    name: "Oxygen",
    formula: "O₂",
    description: "A gas important for respiration.",
    category: "Element",
  },
  {
    id: 4,
    name: "Methane",
    formula: "CH₄",
    description: "A simple hydrocarbon found in natural gas.",
    category: "Compound",
  },
];

function App() {
  // Load saved molecules from localStorage
  const [molecules, setMolecules] = useState(() => {
    try {
      const saved = localStorage.getItem("chemar-molecules");
      return saved !== null ? JSON.parse(saved) : defaultMolecules;
    } catch {
      return defaultMolecules;
    }
  });

  // Search
  const [search, setSearch] = useState("");

  // Form visibility and editing
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    name: "",
    formula: "",
    description: "",
    category: "Compound",
  });

  // Save changes to browser storage
  useEffect(() => {
    localStorage.setItem("chemar-molecules", JSON.stringify(molecules));
  }, [molecules]);

  // Open form for adding
  function handleAdd() {
    setEditingId(null);
    setFormData({
      name: "",
      formula: "",
      description: "",
      category: "Compound",
    });
    setShowForm(true);
  }

  // Open form for editing
  function handleEdit(molecule) {
    setEditingId(molecule.id);
    setFormData({
      name: molecule.name,
      formula: molecule.formula,
      description: molecule.description,
      category: molecule.category,
    });
    setShowForm(true);
  }

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Add or update molecule
  function handleSubmit(event) {
    event.preventDefault();

    const newMolecule = {
      ...formData,
      name: formData.name.trim(),
      formula: formData.formula.trim(),
      description: formData.description.trim(),
    };

    if (editingId !== null) {
      setMolecules((previous) =>
        previous.map((molecule) =>
          molecule.id === editingId
            ? { ...molecule, ...newMolecule }
            : molecule
        )
      );
    } else {
      setMolecules((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...newMolecule,
        },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
  }

  // Delete molecule
  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this molecule?"
    );

    if (confirmed) {
      setMolecules((previous) =>
        previous.filter((molecule) => molecule.id !== id)
      );
    }
  }

  // Search molecules by name or formula
  const filteredMolecules = molecules.filter((molecule) => {
    const keyword = search.toLowerCase();

    return (
      molecule.name.toLowerCase().includes(keyword) ||
      molecule.formula.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="website">

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">⚗</span>
          <span>
            Chem<span className="highlight">AR</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#molecules">Explore</a>
        </div>

        <a href="#molecules" className="nav-button">
          Get Started
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">
          <span className="tag">AUGMENTED REALITY LEARNING</span>

          <h1>
            Explore Chemistry
            <br />
            <span className="highlight">
              Beyond the Classroom.
            </span>
          </h1>

          <p>
            Discover atoms, molecules, and chemical structures
            through an interactive learning experience.
            Make chemistry easier and more exciting with ChemAR.
          </p>

          <div className="hero-buttons">
            <a href="#molecules" className="primary-button">
              Explore Now →
            </a>

            <a href="#about" className="secondary-button">
              Learn More
            </a>
          </div>
        </div>

        {/* Chemistry Illustration */}
        <div className="hero-visual">
          <div className="glow"></div>

          <div className="molecule">
            <div className="bond bond-one"></div>
            <div className="bond bond-two"></div>
            <div className="bond bond-three"></div>

            <div className="atom atom-center">O</div>
            <div className="atom atom-left">H</div>
            <div className="atom atom-right">H</div>
          </div>

          <div className="floating-label label-one">
            <span>01</span> Hydrogen
          </div>

          <div className="floating-label label-two">
            <span>08</span> Oxygen
          </div>

          <div className="floating-label label-three">
            H₂O · Water Molecule
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="features" id="explore">

        <div className="section-heading">
          <span className="tag">DISCOVER CHEMISTRY</span>
          <h2>Learn. Explore. Experience.</h2>
          <p>
            Understand chemistry through interactive and
            engaging learning tools.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">⚛</div>
            <h3>Atoms</h3>
            <p>
              Discover the basic building blocks of matter
              and learn about chemical elements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚗</div>
            <h3>Molecules</h3>
            <p>
              Explore how atoms combine to form different
              molecules and chemical compounds.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">◇</div>
            <h3>AR Learning</h3>
            <p>
              Experience a new way of understanding
              chemistry through 3D visualization.
            </p>
          </div>

        </div>
      </section>

      {/* Molecule Library - CRUD */}
      <section className="molecule-library" id="molecules">

        <div className="section-heading">
          <span className="tag">CHEMISTRY LIBRARY</span>
          <h2>Explore Molecules</h2>
          <p>
            Browse and manage the available chemistry information.
          </p>
        </div>

        {/* Search and Add */}
        <div className="library-controls">

          <input
            type="text"
            className="search-input"
            placeholder="Search by molecule name or formula..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button
            type="button"
            className="add-button"
            onClick={handleAdd}
          >
            + Add Molecule
          </button>

        </div>

        {/* Add and Edit Form */}
        {showForm && (
          <div className="molecule-form-container">

            <h3>
              {editingId !== null ? "Edit Molecule" : "Add New Molecule"}
            </h3>

            <form onSubmit={handleSubmit} className="molecule-form">

              <div className="form-group">
                <label>Molecule Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Water"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Chemical Formula</label>
                <input
                  type="text"
                  name="formula"
                  placeholder="e.g. H2O"
                  value={formData.formula}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Compound">Compound</option>
                  <option value="Element">Element</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter a short description..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-button">
                  {editingId !== null ? "Update Molecule" : "Save Molecule"}
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Molecule Cards */}
        <div className="molecule-grid">

          {filteredMolecules.length > 0 ? (
            filteredMolecules.map((molecule) => (

              <div className="molecule-card" key={molecule.id}>

                <div className="molecule-card-top">
                  <span className="molecule-category">
                    {molecule.category}
                  </span>

                  <span className="molecule-symbol">
                    {molecule.formula}
                  </span>
                </div>

                <h3>{molecule.name}</h3>

                <p>{molecule.description}</p>

                <div className="molecule-actions">

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(molecule)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(molecule.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          ) : (
            <p className="no-results">
              No molecules found. Try another search or add a new molecule.
            </p>
          )}

        </div>

        <p className="molecule-count">
          Showing {filteredMolecules.length} of {molecules.length} molecules
        </p>

      </section>

      {/* About */}
      <section className="about" id="about">

        <div>
          <span className="tag">ABOUT CHEMAR</span>
          <h2>Making Chemistry Easier to Understand.</h2>
        </div>

        <p>
          ChemAR is an educational prototype designed to
          introduce students to chemistry through visual
          learning and augmented reality concepts.
        </p>

      </section>

      {/* Footer */}
      <footer>

        <div className="logo">
          ⚗ Chem<span className="highlight">AR</span>
        </div>

        <p>
          © 2026 ChemAR. Chemistry made interactive.
        </p>

      </footer>

    </div>
  );
}

export default App;

