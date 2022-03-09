package com.nauhtworks.blog.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Blog Entity.
 */
@Entity
@Table(name = "blog")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Blog implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "sequenceGenerator"
	)
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@NotNull
	@Size(min = 3)
	@Column(name = "name", nullable = false)
	private String name;

	@NotNull
	@Size(min = 2)
	@Column(name = "handle", nullable = false)
	private String handle;

	// jhipster-needle-entity-add-field - JHipster will add fields here
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Blog id(Long id) {
		this.id = id;
		return this;
	}

	public String getName() {
		return this.name;
	}

	public Blog name(String name) {
		this.name = name;
		return this;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHandle() {
		return this.handle;
	}

	public Blog handle(String handle) {
		this.handle = handle;
		return this;
	}

	public void setHandle(String handle) {
		this.handle = handle;
	}

	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Blog)) {
			return false;
		}
		return id != null && id.equals(((Blog) o).id);
	}

	@Override
	public int hashCode() {
		// see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	// prettier-ignore
    @Override
    public String toString() {
        return "Blog{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", handle='" + getHandle() + "'" +
            "}";
    }
}
