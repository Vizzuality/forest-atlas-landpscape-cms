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
  has_many :context_datasets
  has_many :datasets, through: :context_datasets

  has_many :context_users
  has_many :users, through: :context_users

  has_many :context_sites
  has_many :sites, through: :context_sites

  def is_site_default_context
    context_sites.each do |context_site|
      return true if context_site.is_site_default_context
    end
    return false
  end

  def is_dataset_default_context
    context_datasets.each do |context_dataset|
      return true if context_dataset.is_dataset_default_context
    end
    return false
  end
end