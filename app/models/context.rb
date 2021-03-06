# == Schema Information
#
# Table name: contexts
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Context < ApplicationRecord
  has_many :context_datasets, dependent: :destroy
  has_many :datasets, through: :context_datasets
  has_many :context_owners, -> { owner }, class_name: 'ContextUser', dependent: :destroy
  has_many :owners, source: :user, through: :context_owners
  has_many :context_writers, -> { writer }, class_name: 'ContextUser', dependent: :destroy
  has_many :writers, source: :user, through: :context_writers
  has_many :context_users
  has_many :users, through: :context_users
  has_many :context_sites, dependent: :destroy
  has_many :sites, through: :context_sites

  validate :steps_validation

  accepts_nested_attributes_for :writers

  cattr_accessor :form_steps do
    {pages: %w[title sites owners writers datasets],
     names: %w[Title Sites Owners Writers Datasets]}
  end

  attr_accessor :form_step

  def site_default_context?
    context_sites.each do |context_site|
      return true if context_site.is_site_default_context
    end

    false
  end

  def dataset_default_context?
    context_datasets.each do |context_dataset|
      return true if context_dataset.is_dataset_default_context
    end

    false
  end

  private

  def steps_validation
    step_index = form_steps[:pages].index(form_step)

    # To make sure all the validations run when the context isn't created through text
    step_index ||= form_steps[:pages].length

    if form_steps[:pages].index('title') <= step_index
      if name.blank? || name.strip.blank?
        errors['name'] << 'You must enter a name for the context'
      end
    end

    if form_steps[:pages].index('sites') <= step_index
      if sites.length <= 0
        errors['sites'] << 'You must select at least one site'
      end
    end

    # No validations for now
    if form_steps[:pages].index('owners') <= step_index
    end

    # No validations for now
    if form_steps[:pages].index('writers') <= step_index
    end

    # Not validations for now
    if form_steps[:pages].index('datasets') <= step_index
    end

    # General validations

    # List of owners and writers can't overlap

  end
end
